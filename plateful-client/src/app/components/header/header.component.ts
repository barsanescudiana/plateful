import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/interfaces/user.interface";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() withHomeButton: boolean = true;
  public user: User | undefined;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("USER_DATA")!);
  }
}
