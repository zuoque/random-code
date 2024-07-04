import { resolve } from "path";
import { defineConfig } from 'vite'
// import dtsPlugin from "vite-plugin-dts";


// https://vitejs.dev/config/
export default defineConfig( ({ mode}) => {
  return {
    // plugins: [dtsPlugin({ outDir: "dist/types" })],
    build: {
      lib: {
        entry: {
          main: resolve(__dirname, 'src/main.ts'),
          area: resolve(__dirname, 'src/packages/area.ts'),
          bankAccount: resolve(__dirname, 'src/packages/bankAccount.ts'),
          creditCode: resolve(__dirname, 'src/packages/creditCode.ts'),
          idNo: resolve(__dirname, 'src/packages/idNo.ts'),
          orgCode: resolve(__dirname, 'src/packages/orgCode.ts'),
          phone: resolve(__dirname, 'src/packages/phone/index.ts'),
          tools: resolve(__dirname, 'src/utils/tools.ts')
        },
        name: "randomCode",
        formats: ["es", "cjs"], // 生成两种引入模式，import和require
        fileName: (moduleFormat, entryName) => {
          let fileName = `${entryName}.${moduleFormat === 'cjs' ? 'cjs' : 'js'}`;
          return entryName === "main" ? fileName : `${entryName}/${fileName}`;
        }
      },
      rollupOptions: {
        external: ['vue'],
      }
    },

    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : []
    }
  }
})
