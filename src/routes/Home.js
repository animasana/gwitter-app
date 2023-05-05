import Gweets from "components/Gweets";
import GweetFactory from "components/GweetFactory";

const Home = ({ userObj }) => {
  return (
    <div className="container">
      <GweetFactory userObj={userObj} />
      <Gweets userObj={userObj} />
      <footer className="homeFooter">&copy;Gwitter {new Date().getFullYear()}</footer>
    </div>        
  );
};

export default Home;
