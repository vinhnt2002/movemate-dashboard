interface ContentDashboardLayoutProps {
  children: React.ReactNode;
}

const ContentDashboardLayout = ({ children }: ContentDashboardLayoutProps) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-4 md:p-6 rounded-md">
      {children}
    </div>
  );
};

export default ContentDashboardLayout;
