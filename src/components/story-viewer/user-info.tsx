import { UserFE } from '../../types/common.types';

type Props = {
  currentUser: UserFE;
  onClose: () => void;
};
const UserInfo = (props: Props) => {
  return (
    <div className="flex items-center p-4">
      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
        <img
          src={props.currentUser.displayPic}
          alt={props.currentUser.username}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-white font-medium">{props.currentUser.username}</span>
      <button onClick={props.onClose} className="ml-auto text-white">
        ✕
      </button>
    </div>
  );
};

export default UserInfo;
