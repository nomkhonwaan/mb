package com.nomkhonwaan.mb.server.exception;

import graphql.ErrorType;
import graphql.GraphQLError;
import graphql.GraphQLException;
import graphql.language.SourceLocation;
import org.springframework.http.HttpStatus;

import java.util.List;

/**
 * An unauthorized exception class implemented GraphQLError interface
 * which is throwable while GraphQL execution.
 * <p>
 * This exception doesn't allowed the custom message
 * but using [HttpStatus.UNAUTHORIZED] from Spring Framework.
 */
public class UnauthorizedException extends GraphQLException implements GraphQLError {
    public UnauthorizedException() {
        super(HttpStatus.UNAUTHORIZED.toString());
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public ErrorType getErrorType() {
        return ErrorType.ExecutionAborted;
    }
}
