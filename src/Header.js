const Header = () => {
  return (
    <header className="my-14">
      <div className="container text-center md:w-9/12 mx-auto">
        <h1 className="leading-tight text-5xl font-extrabold font-headline uppercase">
          Productivity Report Generator
        </h1>
        <hr class="h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-400 to-transparent opacity-25 dark:opacity-100 w-2/3 mx-auto mb-4 mt-2" />
        <p className="leading-normal">
          This is a tool to generate a productivity report for your kitchens
          using data from KSRS. When printing, enable headers and footers as
          well as background graphics if you want colours.
        </p>
      </div>
    </header>
  );
};
export default Header;
