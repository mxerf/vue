import eventBus from "../eventBus";

export default function navigate(page, params) {
  eventBus.$emit("navigate", page, params);
}
