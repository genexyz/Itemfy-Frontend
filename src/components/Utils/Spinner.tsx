export const Spinner = (): JSX.Element => {
  return (
    <div className="my-10 flex items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-t-2 border-b-2 border-white" />
    </div>
  );
};
