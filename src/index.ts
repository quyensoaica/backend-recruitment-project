// import "module-alias/register";
import Application from "./application";
function bootstrap() {
  const application = new Application();
  application.init();
  application.start();
  return application;
}
const instance = bootstrap();
export default instance;
