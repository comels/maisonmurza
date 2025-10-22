import Logo from "../components/Logo";
import NavBar from "../components/NavBar";

export default function About() {
  return (
    <div className="relative w-screen min-h-screen lg:h-screen select-none">
      <NavBar />

      {/* Bloc principal */}
      <div className="flex flex-col lg:flex-row max-w-5xl gap-4 lg:gap-4 mx-auto pt-32 px-10 pb-10">
        {/* Image à gauche (en haut sur mobile) */}
        <img
          src="/images/portrait.jpg"
          alt="Portrait"
          className="w-[80vw] max-w-[520px] max-h-[62vh] object-contain mx-auto lg:mx-0 lg:w-[36vw]"
          draggable={false}
        />

        {/* Texte à droite (en dessous sur mobile) */}
        <p className="leading-relaxed text-justify max-w-2xl mx-auto px-4 lg:pl-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </p>
      </div>

      {/* Logo : visible après le texte sur mobile/iPad, en bas sur desktop */}
      <div className="block lg:hidden px-10 pb-4">
        <img
          src="/images/logo.png"
          alt="Maison Murza"
          className="w-full h-auto object-contain"
          draggable={false}
        />
      </div>

      {/* Version desktop (collé en bas) */}
      <div className="hidden lg:block">
        <Logo />
      </div>
    </div>
  );
}
