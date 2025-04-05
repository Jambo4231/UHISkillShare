import { useRouter } from "next/router";

type NavbarProps = {
  handleLogout: () => void;
};

const navbar = ({ handleLogout }: NavbarProps) => {
  const router = useRouter();

  return (
    <nav className="navbar">
      <a href="/jobs-page">
        <img src="../Media/logo.png" id="logo" alt="UHI Skill Share" title="UHI Skill Share" />
      </a>
      <div className="nav-links">
        <button onClick={() => router.push("/create-new-job")}>+ New Job</button>
        <a href="/my-jobs">My Jobs</a>
        <a href="/notifications-page">Notifications</a>
        <a href="/profile">
          <img src="../Media/DefaultProfile.png" alt="Your Profile" id="NavbarProfile" title="Your Profile" />
        </a>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default navbar;
