export default function BaseLayoutBox({ children }) {
  return (
    <main className="min-h-[80vh] flex flex-col lg:flex-row bg-gray-100 dark:bg-gray-700 my-4">
      {children}
    </main>
  );
}
