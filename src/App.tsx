import StoriesList from './components/stories-list';
import data from './data/data.json';

function App() {
  const users = data.users.filter((user) => user.stories.length > 0);
  const usersFE = users.map((user) => ({
    ...user,
    stories: user.stories.map((story) => ({
      ...story,
      viewed: false,
    })),
  }));
  return (
    <>
      <h1 className="font-bungee-spice px-4 pt-4 pb-2 text-2xl">Instgram - Stories</h1>
      <StoriesList users={usersFE} />
      {/* Dummy UI for posts */}
      <div className="p-4 flex flex-col gap-4">
        <div className="w-full h-80 bg-blue-100 animate-pulse rounded-lg"></div>
        <div className="w-full h-80 bg-green-100 animate-pulse rounded-lg"></div>
        <div className="w-full h-80 bg-gray-100 animate-pulse rounded-lg"></div>
      </div>
    </>
  );
}

export default App;
