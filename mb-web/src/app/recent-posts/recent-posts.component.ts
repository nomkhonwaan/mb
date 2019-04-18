import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import postFragment from '../shared/post/post.fragment';
import Post from '../shared/post/post';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss']
})
export class RecentPostsComponent implements OnInit {
  /**
   * A list of the latest published Posts.
   */
  latestPublishedPosts: Post[];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.fetchLatestPublishedPosts();
  }

  /**
   * Performs GraphQL query to the backend API for retrieving list of latest published Posts.
   */
  fetchLatestPublishedPosts(): void {
    this.apollo.watchQuery({
      query: gql`
        {
          latestPublishedPosts {
            ...post
          }
        }

        ${postFragment}
      `
    }).valueChanges.subscribe((result) => {
      if (result.data) {
        this.latestPublishedPosts = (result.data as { latestPublishedPosts: Post[] }).latestPublishedPosts;
      }
    });
  }

}
