const TopicDetails = ({ topic, description }) => {
  return (
    <div>
      <h2>Welcome to {topic}</h2>
      <p>{description}</p>
    </div>
  );
};

export default TopicDetails;
