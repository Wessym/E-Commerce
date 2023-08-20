import { FormGroup } from "@angular/forms";

export function MustBe(controlName: string) {
return (formGroup: FormGroup) => {
const control = formGroup.controls[controlName];
if (!control.value.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/)) {
    control.setErrors({ mustBe: true });
} else {
    control.setErrors(null);
}
}
}