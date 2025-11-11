import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// const bootstrap = () => bootstrapApplication(AppComponent, config);
export default function bootstrap(context: any) {
    return bootstrapApplication(AppComponent, config, context);
}

// export default bootstrap;
