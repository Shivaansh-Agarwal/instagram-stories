import { useCallback, useState } from 'react';
import { UserFE } from '../../types/common.types';
import Story from '../story';
import StoryViewer from '../story-viewer';

type Props = {
  users: UserFE[];
};
const StoriesList = (props: Props) => {
  const [usersList, setUsersList] = useState<UserFE[]>(props.users);
  const [selectedUser, setSelectedUser] = useState<UserFE | null>(null);

  const onCloseStoryViewer = useCallback(() => {
    setSelectedUser(null);
    setUsersList((usersList) =>
      usersList.map((user) => ({
        ...user,
        stories: user.stories.filter((story) => !story.viewed),
      }))
    );
  }, []);

  const selectNextUser = useCallback(() => {
    const currentIndex = usersList.findIndex((user) => user.userId === selectedUser?.userId);
    const nextUser = usersList[currentIndex + 1];
    if (nextUser) {
      setSelectedUser(nextUser);
    } else {
      setSelectedUser(null);
      onCloseStoryViewer();
    }
    setUsersList(usersList.filter((user) => user.userId !== selectedUser?.userId));
  }, [usersList, selectedUser, onCloseStoryViewer]);

  const selectPreviousUser = useCallback(() => {
    const currentIndex = usersList.findIndex((user) => user.userId === selectedUser?.userId);
    const previousUser = usersList[currentIndex - 1];
    if (previousUser) {
      setSelectedUser(previousUser);
    } else {
      setSelectedUser(null);
      onCloseStoryViewer();
    }
    setUsersList(usersList.filter((user) => user.userId !== selectedUser?.userId));
  }, [usersList, selectedUser, onCloseStoryViewer]);

  const markStoryAsViewed = useCallback((userId: number, storyIndex: number) => {
    setUsersList((users) => {
      return users.map((user) => {
        if (user.userId === userId) {
          return {
            ...user,
            stories: user.stories.map((story, index) => {
              if (index === storyIndex) {
                return { ...story, viewed: true };
              }
              return story;
            }),
          };
        }
        return user;
      });
    });
  }, []);

  return (
    <>
      <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex gap-2 p-4 min-w-min">
          {usersList.map((user) => {
            return (
              <Story
                key={user.userId}
                onClick={() => {
                  setSelectedUser(user);
                }}
                userName={user.username}
                displayPic={user.displayPic}
              />
            );
          })}
        </div>
      </div>
      {selectedUser && (
        <StoryViewer
          currentUser={selectedUser}
          onSelectNextUser={selectNextUser}
          onSelectPreviousUser={selectPreviousUser}
          onClose={onCloseStoryViewer}
          markStoryAsViewed={markStoryAsViewed}
        />
      )}
    </>
  );
};

export default StoriesList;
