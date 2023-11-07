export interface SearchBarProps {
    searchText: string;
    handleSubmit: (e: React.FormEvent) => void;
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}