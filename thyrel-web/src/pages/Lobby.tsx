import UserCard from '../components/lobby/UserCard';

// component when we are in a Lobby (in waiting of game start)
export default function Lobby() {
  return (
    // This is the test for the UserCard component
    <UserCard
      id={1}
      name="Jean"
      avatar="https://cutt.ly/Bkj9im1"
      isOwner={false}
      isKickable={true}
      onKick={id => console.log("Here's the id:", id)}
    />
  );
}
