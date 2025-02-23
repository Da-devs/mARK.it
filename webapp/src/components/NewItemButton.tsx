"use client"
import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useSupabasePost } from './useSupabasePost';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useAuth } from '@/app/utils/authContext';

export const NewItemButton: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { user, session_token } = useAuth();
  const { postToSupabase, isLoading, error } = useSupabasePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const metadata = {
        description: url,
        author: user?.user_metadata.full_name,
        url: url,
        platform: new URL(url).hostname
      };

      if (!session_token) {
        setStatus('error');
        return;
      }

      const authData = {
        session_token: session_token.access_token as unknown as string,
        uuid: session_token.user.id
      };

      await postToSupabase('bookmarks', metadata, authData, {
        onSuccess: () => {
          setStatus('success');
          setUrl('');
          setTimeout(() => {
            setIsOpen(false);
            setStatus('idle');
          }, 1500);
        },
        onError: (error) => {
          console.error('Error creating bookmark:', error);
          setStatus('error');
        }
      });
    } catch (error) {
      console.error('Error creating bookmark:', error);
      setStatus('error');
    }
  };

  const currentStatus = isLoading ? 'loading' : status;

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 flex items-center justify-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            New Bookmark
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Bookmark</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="url"
                placeholder="Enter URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full"
                disabled={currentStatus === 'loading'}
              />
            </div>

            {currentStatus === 'error' && (
              <Alert variant="destructive">
                {error?.message || 'Failed to add bookmark. Please try again.'}
              </Alert>
            )}

            {currentStatus === 'success' && (
              <Alert>
                Bookmark added successfully!
              </Alert>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={currentStatus === 'loading'}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!url || currentStatus === 'loading' || !session_token}
              >
                {currentStatus === 'loading' ? 'Adding...' : 'Add Bookmark'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};