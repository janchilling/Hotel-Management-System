import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-update-contract-context',
  templateUrl: './update-contract-context.component.html',
  styleUrls: ['./update-contract-context.component.scss']
})
export class UpdateContractContextComponent implements OnInit{

  private unsubscribe$: Subject<void> = new Subject<void>();
  discountUpdate: boolean = false;
  markupUpdate: boolean = false;
  roomTypeUpdate: boolean = false;
  supplementsUpdate: boolean = false;
  isError: boolean = false;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      const resource = params['resource'];
      this.updateComponentFlags(resource);
    });
  }

  updateComponentFlags(path: string) {
    // Reset all flags to false initially
    this.discountUpdate = false;
    this.markupUpdate = false;
    this.roomTypeUpdate = false;
    this.supplementsUpdate = false;
    this.isError = false;

    // Set the appropriate flag based on the route path
    switch (path) {
      case 'discount':
        this.discountUpdate = true;
        break;
      default:
        this.isError = true;
        break;
    }
  }
}
