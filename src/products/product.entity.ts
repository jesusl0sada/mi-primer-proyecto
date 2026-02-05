import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({ length: 120 })
    name: string;


    @Column({ type: 'text', nullable: true })
    description: string | null;


    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price: string;


    @Column({ type: 'int', default: 0 })
    stock: number;


    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
