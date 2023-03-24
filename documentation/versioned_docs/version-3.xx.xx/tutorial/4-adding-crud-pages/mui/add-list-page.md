---
id: index
title: 1. Adding List Page
tutorial:
    order: 0
    prev: false
    next: tutorial/adding-crud-pages/{preferredUI}/add-edit-page
---

In [Unit 2.4](/docs/tutorial/getting-started/antd/generate-crud-pages/), we created the CRUD pages automatically with Inferencer. In this unit, we will create the CRUD pages manually using the codes generated by Inferencer. So, you can customize the pages as you wish.

## Creating List Page

First, let's create our file under the `src/pages/blog-posts` folder. We will name it `list.tsx`. Then, we will copy the list page code generated by Inferencer and paste it into the file.

To copy the code and paste it into the file, follow the steps below:

1. Navigate to the <a href="http://localhost:3000/blog-posts" rel="noopener noreferrer nofollow">localhost:3000/blog-posts</a> in your browser.

2. Click on the "Show Code" button in the bottom right corner of the page.

3. You can see the list page code generated by Inferencer. Click on the "Copy" button to copy the code.

4. Paste the code into the you created, `list.tsx` file.

You can see the list page code generated by Inferencer below:

```tsx live previewOnly previewHeight=600px url=http://localhost:3000/blog-posts
setInitialRoutes(["/blog-posts"]);

import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ReadyPage,
    ErrorComponent,
    LightTheme,
    CssBaseline,
    GlobalStyles,
    ThemeProvider,
    RefineSnackbarProvider,
    notificationProvider,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "blog_posts",
                            list: MuiInferencer,
                            show: MuiInferencer,
                            create: MuiInferencer,
                            edit: MuiInferencer,
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};

render(<App />);
```

Instead of coding the list page component from scratch, Inferencer created the required code base on API response, so that we can customize.

## Understanding the List Component

We will go through the list page components and hooks one by one.

-   `<List/>` is a **refine** component that is used to presentation purposes like showing create button or page title etc.

    [Refer to the `<List/>` documentation for more information &#8594](/docs/api-reference/mui/components/basic-views/list)

-   `<DataGrid/>` is a native **Material UI** component that is used to display the data in a tabular format.

    [Refer to the **Material UI** `<DataGrid/>` documentation for more information &#8594](https://mui.com/x/react-data-grid/)

-   `useDataGrid` hook, imported from `@pankod/refine-mui` package, has been developed by using the `useTable` hook imported from `@pankod/refine-core` package. So, It provides all the features of the `useTable` hook.

    It returns the values needed by the `<DataGrid/>` component in the `dataGridProps` variable.

    This is the point where the ✨real magic✨ happens!

    `useDataGrid` hook fetches data from API and wraps them with various helper hooks required for the `<DataGrid/>` component. Data interaction functions like sorting, filtering, and pagination will be instantly available on the `<DataGrid/>` with this single line of code.

    [Refer to the `useDataGrid` documentation for more information &#8594](/docs/api-reference/mui/hooks/useDataGrid/)

-   `<EditButton/>` and `<ShowButton/>` are **refine** components that are used to navigate to the edit and show pages of the record.

    [Refer to the `<EditButton/>` documentation for more information &#8594](/docs/api-reference/mui/components/buttons/edit-button/)

    [Refer to the `<ShowButton/>` documentation for more information &#8594](/docs/api-reference/mui/components/buttons/show-button/)

### Handling Relationships

Each blog post includes the `category` field which has `id` property. This is a foreign key that points to the `categories` resource which is different than "blog_post" resource.

There is a `title` field In the `categories` resource. To display the category `title` in the table, we can use the `useMany` hook provided by **refine**.

This hook allows us to fetch data for multiple records in a single request by providing the `id`'s of the related records. In this case, we need to provide the `id`'s of the blog posts categories. It is particularly useful when we need to fetch related data for multiple records.

[Refer to the `useMany` documentation for more information &#8594](/docs/api-reference/core/hooks/data/useMany/)

In this tutorial, each blog post record has a `category` field as below:

```ts title="https://api.fake-rest.refine.dev/blog_posts"
{
  ...
  "category": {
    "id": 1
  }
  ...
},
{
  ...
  "category": {
    "id": 2
  }
  ...
}
```

We can use the `useMany` hook to fetch the full category records for each of these blog posts, like this:

```tsx
import { useMany } from "@pankod/refine-core";

const { data } = useMany({
    resource: "categories",
    ids: blogPosts.map((blogPost) => blogPost.category.id),
});
```

This will pass the `resource` and `ids` to the `dataProvider`'s `getMany` function. The `dataProvider` will then make a single request to the API to fetch the full records for each category related to the blog posts. The resulting `data` variable will be an array of category records, like this:

```ts
[
    {
        id: 1,
        title: "mock category title",
    },
    {
        id: 2,
        title: "another mock category title",
    },
];
```

We can then use this `data` array to display the `title` of each category in the table.

## Adding the List Page to the App

Now that we have created the list page, we need to add it to the `App.tsx` file.

1. Open `src/App.tsx` file on your editor.

2. Import the created `BlogPostList` component.

3. Replace the `MuiInferencer` component with the `BlogPostList` component.

```tsx title="src/App.tsx"
import { Refine } from "@pankod/refine-core";
import {
    Layout,
    ReadyPage,
    ErrorComponent,
    LightTheme,
    CssBaseline,
    GlobalStyles,
    ThemeProvider,
    RefineSnackbarProvider,
    notificationProvider,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

//highlight-next-line
import { BlogPostList } from "pages/blog-posts/list";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={LightTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
            <RefineSnackbarProvider>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(
                        "https://api.fake-rest.refine.dev",
                    )}
                    notificationProvider={notificationProvider}
                    Layout={Layout}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "blog_posts",
                            //highlight-next-line
                            list: BlogPostList,
                            edit: MuiInferencer,
                            show: MuiInferencer,
                            create: MuiInferencer,
                        },
                    ]}
                />
            </RefineSnackbarProvider>
        </ThemeProvider>
    );
};
export default App;
```

Now, we can see the list page in the browser at <a href="http://localhost:3000/blog-posts" rel="noopener noreferrer nofollow">localhost:3000/blog-posts</a>

<br/>
<br/>

<Checklist>

<ChecklistItem id="add-list-page-mui">
I added the list page to the app.
</ChecklistItem>
<ChecklistItem id="add-list-page-mui-2">
I understood the list page components and hooks.
</ChecklistItem>
<ChecklistItem id="add-list-page-mui-3">
I understood the relationship handling.
</ChecklistItem>

</Checklist>