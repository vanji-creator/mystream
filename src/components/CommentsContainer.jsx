import React from "react";

const commentsData = [
  {
    name: "vanji",
    text: "this is a comment ",
    replies: [
      {
        name: "vanji",
        text: "this is a comment ",
        replies: [],
      },
      {
        name: "vanji",
        text: "this is a comment ",
        replies: [
          {
            name: "vanji",
            text: "this is a comment ",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "vanji",
    text: "this is a comment ",
    replies: [],
  },
  {
    name: "vanji",
    text: "this is a comment ",
    replies: [],
  },
  {
    name: "vanji",
    text: "this is a comment ",
    replies: [],
  },
  {
    name: "vanji",
    text: "this is a comment ",
    replies: [
      {
        name: "vanji",
        text: "this is a comment ",
        replies: [],
      },
      {
        name: "vanji",
        text: "this is a comment ",
        replies: [],
      },
    ],
  },
  {
    name: "vanji",
    text: "this is a comment ",
    replies: [],
  },
  {
    name: "vanji",
    text: "this is a comment ",
    replies: [
      {
        name: "vanji",
        text: "this is a comment ",
        replies: [
          {
            name: "vanji",
            text: "this is a comment ",
            replies: [],
          },
        ],
      },
    ],
  },
];

const Comments = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex my-4">
      <img
        className="h-10"
        src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
      />
      <div className="mx-2 ">
        <p className="font-bold">@{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comments data={comment} />
      <div className="pl-16">
        <CommentList comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="mx-28 my-5 w-[900px] border border-black rounded-lg">
      <h1 className="font-bold text-xl ">
        Comments (with Nested Comments Feature)
      </h1>
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
