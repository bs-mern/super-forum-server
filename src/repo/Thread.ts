import { Length } from "class-validator";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Auditable } from "./Auditable";
import { ThreadCategory } from "./ThreadCategory";
import { ThreadItem } from "./ThreadItem";
import { ThreadPoint } from "./ThreadPoint";
import { User } from "./User";

@Entity({ name: "Threads" })
export class Thread extends Auditable {
  @PrimaryGeneratedColumn({ name: "Id", type: "bigint" })
  id: string;

  @ManyToOne(() => User, (user: User) => user.threads) user: User;

  @OneToMany(() => ThreadItem, (threadItems) => threadItems.thread)
  threadItems: ThreadItem[];

  @OneToMany(() => ThreadPoint, (threadPoint) => threadPoint.thread)
  threadPoints: ThreadPoint[];

  @ManyToOne(() => ThreadCategory, (threadCategory) => threadCategory.threads)
  category: ThreadCategory;

  @Column("int", { name: "Views", default: 0, nullable: false }) views: number;

  @Column("boolean", { name: "IsDisabled", default: false, nullable: false })
  isDisabled: boolean;

  @Column("varchar", { name: "Title", length: 150, nullable: false })
  @Length(5, 150)
  title: string;

  @Column("varchar", { name: "Body", length: 2500, nullable: true })
  @Length(10, 2500)
  body: string;
}
