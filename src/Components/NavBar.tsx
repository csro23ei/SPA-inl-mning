interface Props {
  setPage: (page: string) => void;
}

function NavBar(props: Props) {
  return (
    <div className="navbar">
      <button onClick={() => props.setPage("start")}>Start</button>
      <button onClick={() => props.setPage("booking")}>Boka tid</button>
      <button onClick={() => props.setPage("contact")}>Kontakt</button>
    </div>
  );
}

export default NavBar;
