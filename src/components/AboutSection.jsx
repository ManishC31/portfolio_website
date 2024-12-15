import React from "react";

const AboutSection = () => {
  return (
    <div>
      <div className="container border" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <div className="col-md-6">
            <div className="row justify-content-between gy-4">
              <div className="col-lg-5">
                <img
                  src="assets/img/profile-img.jpg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              {/* ADD SKILLS HERE */}
            </div>

            <div className="skills-content skills-animation">
              <h5>Skills</h5>

              <div className="progress">
                <span className="skill">
                  <span>HTML</span> <i className="val">100%</i>
                </span>
                <div className="progress-bar-wrap">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow="100"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <div className="progress">
                <span className="skill">
                  <span>CSS</span> <i className="val">90%</i>
                </span>
                <div className="progress-bar-wrap">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow="90"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <div className="progress">
                <span className="skill">
                  <span>JavaScript</span> <i className="val">75%</i>
                </span>
                <div className="progress-bar-wrap">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <div className="progress">
                <span className="skill">
                  <span>Photoshop</span> <i className="val">55%</i>
                </span>
                <div className="progress-bar-wrap">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow="55"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="about-me">
              <h4>About me</h4>
              <p>
                As a passionate software developer with over 2.5 years of
                experience, I thrive in the dynamic environment of a
                product-based startup. My expertise spans both frontend and
                backend development, allowing me to create scalable applications
                that deliver exceptional user experiences. I am well-versed in
                various frameworks and technologies, enabling me to tackle
                diverse challenges effectively.
              </p>
              <p>
                I take pride in my coding skills and my ability to collaborate
                with cross-functional teams. My commitment to continuous
                learning drives me to stay updated with industry trends and best
                practices. I believe that innovation is key, and I strive to
                bring fresh ideas to every project I undertake.
              </p>
              <p>
                In my journey as a fullstack developer, I have honed my
                problem-solving abilities and developed a keen eye for detail. I
                am dedicated to building robust solutions that not only meet
                client needs but also enhance overall performance. Let’s connect
                and explore how we can create impactful digital experiences
                together. Feel free to modify any part of it to better suit your
                style or preferences!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
