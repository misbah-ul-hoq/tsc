const Banner = () => {
  return (
    <section className="banner-section items-center container-center grid md:grid-cols-2 gap-5 lg:gap-10">
      <div className="left-content">
        <div className="space-y-4 h-full">
          <h2 className="text-3xl lg:text-5xl font-bold text-accent leading-loose">
            Empowering Education: Together We Achieve More!
          </h2>
          <h3 className="text-2xl font-semibold">
            Join Our Community of Passionate Teachers and Eager Learners
          </h3>
          <p>
            At our online based school, we believe in the power of collaboration
            between teachers and students. Our dedicated educators are committed
            to fostering a supportive and engaging learning environment, while
            our enthusiastic students are eager to explore new knowledge and
            grow every day
          </p>
          <button className="btn btn-primary rounded-full btn-sm">
            Learn More
          </button>
        </div>
      </div>
      <div className="right-content">
        <img src="/banner-illustrator.avif" alt="" className="w-full" />
      </div>
    </section>
  );
};

export default Banner;
