const WritePage = () => {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">새 에피소드 작성</h1>
        <textarea 
          className="w-full h-64 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="내용을 입력하세요..."
        />
      </div>
    );
  };
  export default WritePage;