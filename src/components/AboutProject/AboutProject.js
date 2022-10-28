import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__tittle">О проекте</h2>

      <div className="about-project__container">
        <div className="about-project__info">
          <h3 className="about-project__description about-project__description_type_title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности 
            и финальные доработки.
          </p>
        </div>
        <div className="about-project__info">
          <h3 className="about-project__description about-project__description_type_title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, 
            чтобы успешно защититься.
          </p>
        </div>
      </div>

      <div className="about-project__chart">
        <div className="about-project__chart-sector">
          <h3 className="about-project__chart-time">1 неделя</h3>
          <p className="about-project__chart-caption">Back-end</p>
        </div>
        <div className="about-project__chart-sector about-project__chart-sector_color_grey">
          <h3 className="about-project__chart-time about-project__chart-time_color_grey">4 недели</h3>
          <p className="about-project__chart-caption">Front-end</p>
        </div>
      </div>
        
    </section>
  );
}
  
export default AboutProject;