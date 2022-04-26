export default interface Option {
  name: any;
  warning?: boolean;
  action: () => void;
}
