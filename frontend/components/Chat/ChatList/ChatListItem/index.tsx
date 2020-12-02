import { acceptChat } from "@/store/actions/chat";
import { getAsString } from "@/utils.ts/getAsString";
import { PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { SChatListItem } from "./styles";

interface IChatListItem {
  userName: string;
  id: number;
  isNotify: boolean;
  isRead?: boolean;
}

const ChatListItem: React.FC<IChatListItem> = ({
  isRead,
  userName,
  id,
  isNotify,
}) => {
  const dispatch = useDispatch();

  const { query } = useRouter();

  const accceptHandler = () => {
    if (isNotify) {
      dispatch(acceptChat(id, userName));
    }
  };

  return (
    <SChatListItem
      isNotify={isNotify}
      isActive={getAsString(query.id) === String(id)}
    >
      {isNotify ? (
        <>
          <h4>{userName}</h4>
          <PlusCircleOutlined
            style={{ cursor: "pointer" }}
            onClick={accceptHandler}
          />
        </>
      ) : (
        <Link href={`/support/?id=${id}`}>
          <a>
            <h4>
              {userName}
              &nbsp;
              {isRead !== undefined && isRead && "!"}
            </h4>
          </a>
        </Link>
      )}
    </SChatListItem>
  );
};

export default ChatListItem;
