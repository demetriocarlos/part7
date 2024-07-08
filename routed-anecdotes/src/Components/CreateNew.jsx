import { useState } from "react";
import { Notification } from "./Notification";
import { useField } from "../hooks";

export const CreateNew = (props) => {
  /*const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");
*/

  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    props.addNew({
      /*content,
      author,
      info,
      votes: 0,*/
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    setNotification({
      message: `Anew anecdote: ${content.value}`,
      type: "success",
    });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const handleReset = () => {
    content.setValue("");
    author.setValue("");
    info.setValue("");
  };
  //console.log(handleSubmit);

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

/**
 * <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
 */
