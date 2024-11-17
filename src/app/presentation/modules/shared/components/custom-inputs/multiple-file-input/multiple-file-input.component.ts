import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SvgIconComponent } from 'angular-svg-icon';
import { FileSizePipe } from '../../../pipes/file-size.pipe';

@Component({
  selector: 'app-multiple-file-input',
  standalone: true,
  imports: [CommonModule, SvgIconComponent, FileSizePipe],
  providers : [
    {
      provide : NG_VALUE_ACCESSOR,
      useExisting : forwardRef(() => MultipleFileInputComponent),
      multi : true
    }
  ],
  templateUrl: './multiple-file-input.component.html',
  styleUrls: ['./multiple-file-input.component.css'],
})
export class MultipleFileInputComponent
  implements ControlValueAccessor, OnInit
{
  onChange?: (v: File[]) => void;
  onTouched?: () => void;

  isDisabled = false;

  private cdr = inject(ChangeDetectorRef);

  constructor() {}

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  writeValue(files: File[] | null): void {
    this.files = files;

    if(files) {
      this.setImageToView(files[0]);
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (v: File[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    //set the disable state to not
    this.isDisabled = isDisabled;
  }

  changeValue(value: File[]): void {
    this.files = value;
    this.onTouched?.();
    this.onChange?.(value);
    this.cdr.detectChanges();
  }

  imgBase64: string | null = null;

  files: File[] | null = null;

  //#inputFile how to get the element to dispatch then the even onchange

  @ViewChild('inputFile') inputFile: any;

  onClickInputWrapper() {
    if (this.isDisabled) {
      return;
    }
    this.inputFile.nativeElement.click();
    this.cdr.detectChanges();
  }

  onChangeFile(event: any) {
    let fileList = event.target.files;

    const filesArray: File[] = Array.from(fileList);

    // if (filesArray.length > 0) {
    //   this.setImageToView(filesArray[0]);
    // }

    const files = this.files ? [...this.files, ...filesArray] : filesArray;

    this.changeValue(files);
    this.cdr.detectChanges();
  }

  setImageToView(file: File) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.imgBase64 = reader.result as string;
    };

    reader.onloadend = () => {
      this.cdr.detectChanges();
    };
  }

  deleteImage(file: File) {
    if (this.files) {
      this.files = this.files.filter((f) => f !== file);
      if (this.files.length > 0) {
        this.setImageToView(this.files[0]);
      }
      this.changeValue(this.files);
      this.imgBase64 = null;
      this.cdr.detectChanges();
    }
  }
}
