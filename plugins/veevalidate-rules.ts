import { configure, defineRule } from "vee-validate";
import { required, email, min, url } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";

export default defineNuxtPlugin(() => {
  configure({
    generateMessage: localize("pt", {
      messages: {
        required: "Este campo é obrigatório",
        email: "Este campo deve ser um e-mail válido",
      },
    }),
  });

  defineRule("required", required);
  defineRule("email", email);
  defineRule("min", min);
  defineRule("url", url);

  defineRule("minMax", (value: string, [min, max]: any) => {
    if (!value || !value.length) {
      return true;
    }
    if (value.length < min) {
      return `Este campo deve ser maior que ${min}`;
    }
    if (value.length > max) {
      return `Este campo deve ser menor que ${max}`;
    }
    return true;
  });

  defineRule("confirmed", (value, [target]: any, ctx) => {
    if (value === ctx.form[target]) {
      return true;
    }
    return "As senhas não conferem";
  });
});
