import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { SolutionModule } from './solution/solution.module';
import { FaasPlatformService } from './api/faasPlatform.service';
import { SharedModule } from './shared/shared.module';
import { FassStatusService } from './solution/faasStatus.service';

@NgModule({
   imports: [
      BrowserModule,
      SharedModule,
      ClarityModule.forRoot(),
      SolutionModule
   ],
   declarations: [AppComponent],
   providers: [FaasPlatformService, FassStatusService],
   bootstrap: [AppComponent]
})
export class AppModule { }
