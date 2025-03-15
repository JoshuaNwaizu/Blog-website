const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="m-[4rem] text-center">
      &copy {year} JNS • Built with NodeJS
    </footer>
  );
};

export default Footer;
