
export interface CustomizationTabProps {
  onSelectChange: (name: string, value: string) => void;
}

export interface AppearanceTabProps extends CustomizationTabProps {
  onImageUpload?: (file: File) => void;
  coverImageUrl?: string;
}
