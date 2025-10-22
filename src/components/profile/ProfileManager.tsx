
import React, { useState } from 'react';
import ProfileView from './ProfileView';
import ProfileEditForm from './ProfileEditForm';

const ProfileManager: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-invitopia-800">
          Mon Profil
        </h1>
        <p className="text-invitopia-600 mt-2">
          Gérez vos informations personnelles et votre photo de profil
        </p>
      </div>

      {isEditing ? (
        <ProfileEditForm onCancel={handleCancel} />
      ) : (
        <ProfileView onEdit={handleEdit} />
      )}
    </div>
  );
};

export default ProfileManager;
