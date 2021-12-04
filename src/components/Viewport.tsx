import {FunctionalComponent, h} from 'preact';

const Viewport: FunctionalComponent = () => {
  return (
    <span className={"absolute top-6 right-4"}>
      <pre className="sm:hidden">base</pre>
      <pre className="hidden sm:block md:hidden">sm</pre>
      <pre className="hidden md:block lg:hidden">md</pre>
      <pre className="hidden lg:block xl:hidden">lg</pre>
      <pre className="hidden xl:block 2xl:hidden">xl</pre>
      <pre className="hidden 2xl:block">2xl</pre>
    </span>
  );
};

export default Viewport;
