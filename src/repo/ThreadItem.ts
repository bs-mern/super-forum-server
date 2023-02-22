import { Length } from "class-validator";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Auditable } from "./Auditable";
import { Thread } from "./Thread";
import { ThreadItemPoint } from "./ThreadItemPoint";
import { User } from "./User";

@Entity({ name: "ThreadItems" })
export class ThreadItem extends Auditable {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" }) id: string;

  @ManyToOne(() => Thread, (thread) => thread.threadItems) thread: Thread;

  @ManyToOne(() => User, (user) => user.threadItems) user: User;

  @OneToMany(
    () => ThreadItemPoint,
    (threadItemPoint) => threadItemPoint.threadItem
  )
  threadItemPoints: ThreadItemPoint[];

  @Column("int", { name: "Views", default: 0, nullable: false })
  views: number;

  @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
  isDisabled: boolean;

  @Column("varchar", { name: "Body", length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;
}
