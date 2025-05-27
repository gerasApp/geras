import SideBar from '@/app/components/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row md:overflow-hidden">
      <SideBar />
      <div className="flex-grow auto p-12">{children}</div>
    </div>
  );
}

