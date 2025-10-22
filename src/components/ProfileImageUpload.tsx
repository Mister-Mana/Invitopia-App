import React from 'react';
import EnhancedProfileImageUpload from '@/components/profile/EnhancedProfileImageUpload';

interface ProfileImageUploadProps {
  currentImageUrl?: string;
  onImageUpdate: (imageUrl: string | null) => void;
  userName: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImageUrl,
  onImageUpdate,
  userName
}) => {
  return (
    <EnhancedProfileImageUpload
      currentImage={currentImageUrl}
      onImageChange={onImageUpdate}
      fallbackText={userName.charAt(0).toUpperCase()}
      size="lg"
    />
  );
};

export default ProfileImageUpload;