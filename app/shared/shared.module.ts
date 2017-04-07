import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemoryFormatPipe } from './memoryFormat.pipe';

@NgModule({
   imports: [CommonModule],
   declarations: [MemoryFormatPipe],
   exports: [MemoryFormatPipe, CommonModule]
})
export class SharedModule { }
