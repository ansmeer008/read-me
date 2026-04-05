import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 상단 헤더 */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
            READ-ME <span className="text-gray-400 font-light text-sm ml-2">Web Novel</span>
          </Link>
          <nav>
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">내 서재</Link>
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* 하단 푸터 */}
      <footer className="bg-white border-t py-8 text-center text-gray-400 text-sm">
        © 2026 Read-Me Project. Powered by GitHub Issues API.
      </footer>
    </div>
  );
};

export default Layout;