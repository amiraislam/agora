import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, ReplaySubject, Subject, combineLatest, filter, from, interval, map, mergeMap, of, pipe, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection :  ChangeDetectionStrategy.OnPush
})
export class AppComponent {
   myObservable$ = of(4,2);
   myObservable1$ = of(6,9);
    messageSubject   = new Subject<string>();
   messages$ = this.messageSubject.asObservable();

   source1$: Observable<number> = of(4,2);
   source2$: Observable<number> = of(6,9);

   source3$: Observable<number> = from([1,2]);
   source4$: Observable<number> = from([4,5555]);
  //  myObservable$ = of(42,33);
    myObservable2$ = from([3,45,44]);
    subject$ : Observable<number>;
    subject1$ : Observable<number>;
    subject1 : number | undefined;
    //
 
    myObservabletest$ = of("foobar");
  constructor(private cd : ChangeDetectorRef)
  {

    this.messageSubject.next('test');
    this.messageSubject.next('test+');
    this.messageSubject.next('test++');
    this.messageSubject.next('test1');
    this.messageSubject.next('test1+');
    this.messageSubject.next('test1++');
    cd.markForCheck();
    this. messages$.subscribe((X)=>
      console.log(X)
    );
    this.messageSubject.complete();
    this.myObservable$ = this.myObservable2$.pipe(
      
      filter((X :any)=> X > 4),
      take(1),
      tap((X :any)=> X*2),
      map((X :any)=> X*2));

      this.myObservabletest$ = this.myObservabletest$.pipe(
        tap((value) => value + ` ef+++`),
        map((value: string) => value + ` ef`),
        tap((value) => console.log('Après : ')),
    );
    this.subject$  = combineLatest(
      this.source1$,  // l'observable qui émet l'utilisateur connecté
      this.source2$   // l'observable qui émet la liste des articles
    ).pipe(
      map(([source1, source2]) => {
        return source1 + source2 ;
      })
    )


    this.subject1$  = 
      this.source3$.pipe(
        mergeMap(x => this.source4$.pipe((city)=> city  )));

        
    //  this.subject1$  = interval(100).pipe(
    //   filter((x)=> x % 2 == 1),
  
    //   map(x => {
       
    //     return x
    //    }) ,
    //  );

       }



}
