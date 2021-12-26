import classes from './about.module.css'

function About() {
  return (
    <div className={classes.about}>
      <div className={classes.brandname}>Just a Recipe</div>
      <p className={classes.paragraph}>
        Hey there, i am pratap and a web developer. This website is my attempt to bring the maximum number of recipes
        from top Indian food blogers in one place. JAR (just a recipe) has recipes for vegetarians and non vegetarians
        and also has vegan and diabetic friendly recipes.
      </p>
      <p className={classes.paragraph}>
        I have collected the recipes data from 3 different food blogs using a web scrapper tool called puppeteer. There
        may be some recipes that i might have missed or may be a new recipes have been added after JAR was developed.
        For a complete list of recipes, please these top food blogs. They are really awesome and has the delicious and
        healthy recipes that we can find.
      </p>
      <p className={classes.paragraph}>
        There are many other websites and blogs that also has exciting, delicious and healthy recipes. It is not
        possible for me to collect data from all those websites or blogs. Therefore, i have selected the top 3 ones from{' '}
        <a href="https://blog.feedspot.com/" target="_blank">
          feedspot
        </a>
        .
      </p>
      <p className={classes.paragraph}>
        I would love to hear what you think about this website. Please leave a feedback, any suggestion or
        issues\concern that you have.
      </p>
      <p className={classes.paragraph}>
        To know more about me and my work, please visit my{' '}
        <a className={classes.link} href="https://github.com/pratapreddy15" target="_blank">
          github
        </a>{' '}
        and{' '}
        <a className={classes.link} href="https://www.linkedin.com/in/pratapreddy15" target="_blank">
          linkedin
        </a>{' '}
        profile.
      </p>
    </div>
  )
}

export default About
