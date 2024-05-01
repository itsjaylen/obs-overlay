import axios from "axios";

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
      selectedFiles: [],
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
      this.dialog_create = true;
    },
    uploadItem(): void {
      this.dialog_upload = true;
      this.dialog_create = false;
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
      this.dialog = true;
      // this.items.splice(index, 1);
    },
    cancelDelete(): void {
      this.dialog = false;
    },
    confirmDelete(index: number): void {
      this.dialog = false;
      this.items.splice(index, 1);
    },
    uploadFiles(): void {
      this.selectedFiles.forEach((file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        axios
          .post("http://localhost:9191/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("File uploaded:", response.data);
            this.dialog_upload = false;
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
          });
      });

      // Optionally, clear selected files after uploading
      this.selectedFiles = [];
    },
  },
});
