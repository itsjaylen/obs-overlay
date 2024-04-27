interface Item {
  title: string;
  icon: string;
  lockIcon: string;
  isVisible: boolean;
}

export default defineComponent({
  data() {
    return {
      isLocked: false,
      dialog: false,
      dialog_create: false,
      dialog_upload: false,
      items: <Item[]>[
        {
          title: "Example Item 1",
          icon: "mdi-image",
          lockIcon: "mdi-lock",
          isVisible: true,
        },
        {
          title: "Example Item 2",
          icon: "mdi-image",
          lockIcon: "mdi-lock-open",
          isVisible: true,
        },
      ],
    };
  },
  methods: {
    handleIconClick(index: number): void {
      console.log("Icon clicked for item at index:", index);
    },
    addItem(): void {
      this.items.push({
        title: "New Item",
        icon: "mdi-image",
        lockIcon: "mdi-lock",
        isVisible: true,
      });
    },
    createItem(): void {
        this.dialog_create = true
    },
    uploadItem(): void {
        this.dialog_upload = true
        this.dialog_create = false
    },
    toggleVisibility(index: number): void {
      this.items[index].isVisible = !this.items[index].isVisible;
    },
    toggleLock(index: number): void {
      console.log(this.items[index].lockIcon);
      this.items[index].lockIcon =
        this.items[index].lockIcon === "mdi-lock" ? "mdi-lock-off" : "mdi-lock";
    },
    deleteItem(index: number): void {
        this.dialog = true
      //this.items.splice(index, 1);
    },
    cancelDelete(): void {
      this.dialog = false;
    },
    confirmDelete(index: number): void {
      this.dialog = false;
      this.items.splice(index, 1);
    },
    handleFileUpload(event: { target: { files: any; }; }): void {
        const files = event.target.files;
        console.log(files);
    }
  },
});