function Chirp(props) {
  const { chirp_text, chirp_image, username } = { ...props };
  return (
    <div className="chirp">
      <p>Posted by: {username}</p>
      {chirp_image ? <p>{chirp_image}</p> : null}
      <p>{chirp_text}</p>
    </div>
  );
}

export default Chirp;
